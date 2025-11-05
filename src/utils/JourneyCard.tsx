"use client";
import styles from "./style.module.css";
import { useTransform, motion, useScroll } from "framer-motion";
import { ArrowBigLeft, ArrowBigRightDash } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const JourneyCard = ({
  i,
  description,
  progress,
  range,
  targetScale,
  desktop,
  mobile,
  caption,
  ctaHref,
  ctaText,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={styles.card}
      >
        <div
          className={styles.bgImage}
          style={{
            backgroundImage: `url(${
              typeof window !== "undefined" && window.innerWidth <= 768
                ? mobile
                : desktop
            })`,
          }}
        />
        <div className={styles.overlay} />

        <div className={styles.content}>
          <h2>{caption}</h2>

          <div className={styles.body}>
            <div className={styles.description}>
              {description && <p>{description}</p>}
              <span>
                <Link to={ctaHref}>{ctaText}</Link>

                <ArrowBigRightDash size={16} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JourneyCard;
