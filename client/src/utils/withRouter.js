import { useNavigate, useLocation, useParams } from "react-router-dom";

function WithRouter(Component) {
  function WithRouterComponent(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  }

  return WithRouterComponent;
}

export default WithRouter;