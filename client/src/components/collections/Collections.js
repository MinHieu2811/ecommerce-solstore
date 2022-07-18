import React, { useEffect } from 'react';
import './collections.scss';
import img1 from '../../assets/images/banner/banner1.jpg'
import img2 from '../../assets/images/banner/banner2.jpg'
import img3 from '../../assets/images/banner/banner3.jpg'
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Collections = () => {

    const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            control.start("visible");
        }else{
            control.start("hidden");
        }
        }, [inView, control]);

    const content = [
        {
            img: img1,
            title: "summer collection",
            class: "col-4"
        },
        {
            img: img2,
            title: "tom ford collection",
            class: "col-3"
        },
        {
            img: img3,
            title: "marvelous super collection",
            class: "col-5"
        }
    ]

    return (
        <div className='collection-wrapper'>
            {
                content.map((item, index) => (
                    <motion.div key={index} className={`collection-wrapper_items ${item.class} col-md-8`} 
                    initial="hidden"
                    animate={control}
                    ref={ref}
                    variants={{
                      visible: {
                        translateY: 0,
                        opacity: 1,
                        transition: { duration: 0.2, delay: index*0.2 },
                      },
                      hidden: { translateY: 100, opacity: 0 },
                    }}
                    >
                        <div className="collection-wrapper_items_bg"  style={{backgroundImage: "url(" + item.img + ")"}}></div>
                        <div className="collection-wrapper_items_overlay"></div>
                        <div className="collection-wrapper_items_text">
                            <div className="collection-wrapper_items_text_title">
                                <h1>{item.title}</h1>
                            </div>
                            <div className="collection-wrapper_items_text_btn">
                                <button className='btn'>Shop now</button>
                            </div>
                        </div>
                    </motion.div>
                ))
            }
        </div>
    )
}

export default Collections
