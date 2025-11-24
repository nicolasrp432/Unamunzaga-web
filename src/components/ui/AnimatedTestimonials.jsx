
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './AnimatedTestimonials.css';

export const AnimatedTestimonials = ({ items, direction = "left", speed = "fast", pauseOnHover = true }) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        addAnimation();
    }, []);

    const [start, setStart] = useState(false);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className="scroller-container"
        >
            <div
                ref={scrollerRef}
                className={`scroller-inner ${start && "start-animation"} ${pauseOnHover && "pause-on-hover"}`}>
                {items.map((item, idx) => (
                    <li
                        className="scroller-item"
                        key={item.name}
                    >
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="scroller-quote"
                            >
                                “
                            </div>
                            <span className="scroller-quote-text">
                                {item.quote}
                            </span>
                            <div className="scroller-author">
                                <img src={item.image} alt={item.name} />
                                <div className="author-info">
                                    <span className="author-name">{item.name}</span>
                                    <span className="author-title">{item.title}</span>
                                </div>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </div>
        </div>
    );
};