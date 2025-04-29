'use client';
import { useScrollVisibility } from '@/app/hooks/useScrollVisibility';

interface ScrollAwareComponentProps {
    children: React.ReactNode;
    className?: string;
    position?: 'top' | 'bottom';
}

export default function ScrollAwareComponent({ 
    children, 
    className = '',
    position = 'bottom' 
}: ScrollAwareComponentProps) {
    const isVisible = useScrollVisibility();

    const transformClass = position === 'bottom' 
        ? (isVisible ? 'translate-y-0' : 'translate-y-[100%]')
        : (isVisible ? 'translate-y-0' : '-translate-y-[100%]');

    return (
        <div className={`transition-transform duration-300 ${transformClass} ${className}`}>
            {children}
        </div>
    );
}
