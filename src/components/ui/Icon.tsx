import React from "react";
import Svg, { Path, Circle, Rect, Polyline, Line } from "react-native-svg";

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const wrap = (children: React.ReactNode) =>
  ({ size = 24, color = "#000", strokeWidth = 2 }: IconProps) =>
    (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </Svg>
    );

export const ChevronLeft = wrap(<Polyline points="15 18 9 12 15 6" />);
export const ChevronRight = wrap(<Polyline points="9 18 15 12 9 6" />);
export const ChevronDown = wrap(<Polyline points="6 9 12 15 18 9" />);

export const Search = wrap(
  <>
    <Circle cx={11} cy={11} r={8} />
    <Line x1={21} y1={21} x2={16.65} y2={16.65} />
  </>,
);

export const Bell = wrap(
  <>
    <Path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </>,
);

export const MapPin = wrap(
  <>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx={12} cy={10} r={3} />
  </>,
);

export const Home = wrap(
  <>
    <Path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z" />
  </>,
);

export const ShoppingCart = wrap(
  <>
    <Circle cx={9} cy={21} r={1} />
    <Circle cx={20} cy={21} r={1} />
    <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </>,
);

export const Package = wrap(
  <>
    <Path d="M16.5 9.4l-9-5.19" />
    <Path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <Polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <Line x1={12} y1={22.08} x2={12} y2={12} />
  </>,
);

export const User = wrap(
  <>
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx={12} cy={7} r={4} />
  </>,
);

export const Truck = wrap(
  <>
    <Rect x={1} y={3} width={15} height={13} />
    <Polyline points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <Circle cx={5.5} cy={18.5} r={2.5} />
    <Circle cx={18.5} cy={18.5} r={2.5} />
  </>,
);

export const Heart = wrap(
  <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
);

export const Filter = wrap(
  <Polyline points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
);

export const Star = wrap(
  <Path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
);

export const Trash = wrap(
  <>
    <Polyline points="3 6 5 6 21 6" />
    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </>,
);

export const Check = wrap(<Polyline points="20 6 9 17 4 12" />);

export const Plus = wrap(
  <>
    <Line x1={12} y1={5} x2={12} y2={19} />
    <Line x1={5} y1={12} x2={19} y2={12} />
  </>,
);

export const Camera = wrap(
  <>
    <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <Circle cx={12} cy={13} r={4} />
  </>,
);

export const Phone = wrap(
  <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />,
);

export const Shield = wrap(<Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />);

export const Calendar = wrap(
  <>
    <Rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
    <Line x1={16} y1={2} x2={16} y2={6} />
    <Line x1={8} y1={2} x2={8} y2={6} />
    <Line x1={3} y1={10} x2={21} y2={10} />
  </>,
);

export const Clock = wrap(
  <>
    <Circle cx={12} cy={12} r={10} />
    <Polyline points="12 6 12 12 16 14" />
  </>,
);

export const Lock = wrap(
  <>
    <Rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>,
);

export const Upload = wrap(
  <>
    <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <Polyline points="17 8 12 3 7 8" />
    <Line x1={12} y1={3} x2={12} y2={15} />
  </>,
);

export const Settings = wrap(
  <>
    <Circle cx={12} cy={12} r={3} />
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </>,
);

export const ArrowRight = wrap(
  <>
    <Line x1={5} y1={12} x2={19} y2={12} />
    <Polyline points="12 5 19 12 12 19" />
  </>,
);

export const Tag = wrap(
  <>
    <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <Line x1={7} y1={7} x2={7.01} y2={7} />
  </>,
);

export const Headphones = wrap(
  <Path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />,
);

export const Percent = wrap(
  <>
    <Line x1={19} y1={5} x2={5} y2={19} />
    <Circle cx={6.5} cy={6.5} r={2.5} />
    <Circle cx={17.5} cy={17.5} r={2.5} />
  </>,
);

export const Rupee = wrap(
  <>
    <Line x1={6} y1={3} x2={20} y2={3} />
    <Line x1={6} y1={8} x2={20} y2={8} />
    <Path d="M6 13h7a4 4 0 0 0 0-8" />
    <Line x1={6} y1={13} x2={15} y2={21} />
  </>,
);

export const Building = wrap(
  <>
    <Rect x={4} y={2} width={16} height={20} rx={2} />
    <Line x1={9} y1={6} x2={9} y2={6.01} />
    <Line x1={15} y1={6} x2={15} y2={6.01} />
    <Line x1={9} y1={10} x2={9} y2={10.01} />
    <Line x1={15} y1={10} x2={15} y2={10.01} />
    <Line x1={9} y1={14} x2={9} y2={14.01} />
    <Line x1={15} y1={14} x2={15} y2={14.01} />
    <Path d="M10 22v-4h4v4" />
  </>,
);

export const Mic = wrap(
  <>
    <Rect x={9} y={2} width={6} height={11} rx={3} />
    <Path d="M19 10v1a7 7 0 0 1-14 0v-1" />
    <Line x1={12} y1={19} x2={12} y2={23} />
    <Line x1={8} y1={23} x2={16} y2={23} />
  </>,
);
