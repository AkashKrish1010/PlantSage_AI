import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
  style?: React.CSSProperties;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
  showCallback = false,
  style = {},
  tag = 'p',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);
  const animationTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!inView || !containerRef.current || animationTriggered.current) return;
    animationTriggered.current = true;

    const elements = containerRef.current.querySelectorAll('.split-item');
    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          if (showCallback) {
            console.log('All letters have animated!');
          }
          if (onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        },
      }
    );
  }, [inView, text, delay, duration, ease, from, to, showCallback, onLetterAnimationComplete]);

  // Split logic
  const items = splitType === 'words' ? text.split(' ') : text.split('');
  const Tag = tag as any;

  return (
    <Tag
      ref={containerRef}
      className={`inline-block whitespace-normal ${className}`}
      style={{ textAlign, wordBreak: 'break-word', ...style }}
    >
      {items.map((item, idx) => {
        if (splitType === 'words') {
          return (
            <span
              key={idx}
              className="split-item inline-block"
              style={{ willChange: 'transform, opacity' }}
            >
              {item}&nbsp;
            </span>
          );
        } else {
          // splitType === 'chars'
          return (
            <span
              key={idx}
              className="split-item inline-block"
              style={{ willChange: 'transform, opacity' }}
            >
              {item === ' ' ? '\u00A0' : item}
            </span>
          );
        }
      })}
    </Tag>
  );
};

export default SplitText;
