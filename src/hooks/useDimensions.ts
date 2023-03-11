import { useEffect, useState } from "react"

export const useRefDimensions = (ref: React.RefObject<HTMLElement>) => {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    useEffect(() => {
        if (!ref.current) return;
        const resizeObserver = new ResizeObserver(() => {
            if (ref.current) {
		        const { current } = ref;
			    const boundingRect = current.getBoundingClientRect();
			    const { width, height } = boundingRect;
			    setDimensions({ width: Math.round(width), height: Math.round(height) });
		    }
        });
        resizeObserver.observe(ref.current);
        return () => resizeObserver.disconnect(); // clean up 
    }, []);

	useEffect(() => {
		if (ref.current) {
			const { current } = ref;
			const boundingRect = current.getBoundingClientRect()
			const { width, height } = boundingRect
			setDimensions({ width: Math.round(width), height: Math.round(height) });
		}
	}, [ref])
	return dimensions;
}
