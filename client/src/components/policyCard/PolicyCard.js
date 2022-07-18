import React, {useEffect} from 'react'
import './policyCard.scss';
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion';
import { motion } from 'framer-motion';

const PolicyCard = ({product}) => {
    const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            control.start("visible");
        }else{
            control.start("hidden");
        }
        }, [inView, control]);
    return (
        <motion.div className="policy-card" initial="hidden" animate={control} ref={ref} variants={{
            visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
            hidden: { opacity: 0, scale: 0 }
          }}>
            <div className="policy-card_item">
                <i className={product.icon}></i>
            </div>
            <div className="policy-card_info">
                <div className="policy-card_info_title">
                    {product.name}
                </div>
                <div className="policy-card_info_description">
                    {product.description}
                </div>
            </div>
        </motion.div>
    )
}

export default PolicyCard
