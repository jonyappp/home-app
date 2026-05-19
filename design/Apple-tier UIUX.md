Role \& Objective:

Act as an Elite UI/UX Front-End Engineer specializing in Apple-tier micro-interactions and advanced CSS. Your task is to program a perfectly centered navigation bar in a strictly SINGLE HTML file containing all HTML, vanilla CSS, and vanilla JavaScript. No external libraries or frameworks (No Tailwind, React, etc.).



Design Concept - "True Liquid Glass":

CRITICAL INSTRUCTION: Do NOT generate standard, flat "glassmorphism" or basic frosted glass. I require a physically accurate "Liquid Glass" aesthetic. It must look like wet, poured clear resin, combining the high-gloss specular highlights of classic macOS Aqua with the volumetric spatial depth of modern Apple VisionOS.



1\. The Liquid Glass Material \& Lighting (CSS):

\- Deep Refraction: Use `backdrop-filter` with extreme blur (e.g., 50px) and over-saturation (200%).

\- Specular Highlight: Create a curved, semi-transparent white gradient on the top half using a pseudo-element (`::before`) to simulate a hard light reflection on a wet, rounded 3D surface.

\- Caustics \& Volume: Use multi-layered inner and outer `box-shadow` properties to simulate light refracting at the bottom edge and casting a realistic ambient drop shadow.

\- Interactive Glare: Implement a soft radial-gradient spotlight inside the glass that dynamically tracks the user's mouse cursor (X/Y coordinates) using JavaScript and CSS variables (`mix-blend-mode: overlay`).



2\. Navigation Layout \& Elements:

\- Center the pill-shaped navigation bar perfectly in the middle of the viewport.

\- Include 3 main navigation items with minimalist, inline SVG stroke icons and text labels: "Home", "Call", and "List".

\- Add a subtle vertical divider line after the main buttons.

\- Next to the divider, add a Dark/Light Mode toggle button containing inline SVG Sun and Moon icons.



3\. Animations \& "Apple Magic":

\- Sliding Active Pill: Create a solid background "pill" that sits \*behind\* the active navigation item's text/icon. When a different item is clicked, this pill must dynamically recalculate its width and slide to the new position.

\- Spring Physics: The sliding transition MUST use an exact Apple-style bouncy spring easing curve (e.g., `transition: all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)`).

\- Tactile Feedback: Buttons and icons must physically press down slightly (`transform: scale(0.92)`) when clicked (`:active`).

\- Theme Switch: The Sun and Moon icons must smoothly rotate, scale, and cross-fade during the transition.



4\. Background Environment (Crucial):

\- Glass needs light and color to refract! Create a full-viewport, smoothly animated mesh gradient background using 3 large, heavily blurred, floating color blobs.

\- Implement full Dark/Light mode logic using CSS variables (`:root` and `\[data-theme="dark"]`). Toggling the theme must seamlessly transition the background blob colors, glass opacity, shadow intensity, and text colors.



Output ONLY the pristine, production-ready code. Prioritize maximum visual fidelity and silky-smooth 60fps animations.

