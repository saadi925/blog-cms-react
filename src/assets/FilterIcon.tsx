const FilterIcon = ({ size = 24, fill = "#fff" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Filter"
      x="0"
      y="0"
      width={size}
      height={size}
      fill={fill}
      version="1.1"
      viewBox="0 0 29 29"
      xmlSpace="preserve"
    >
      <path
        d="M10.5 27C5.813 27 2 23.187 2 18.5S5.813 10 10.5 10s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5zm0-15C6.916 12 4 14.916 4 18.5S6.916 25 10.5 25s6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5z"
        fill="#e95230"
        className="color000000 svgShape"
      ></path>
      <path
        d="M18.5 27c-4.687 0-8.5-3.813-8.5-8.5s3.813-8.5 8.5-8.5 8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5zm0-15c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5z"
        fill="#e95230"
        className="color000000 svgShape"
      ></path>
      <path
        d="M14.5 19C9.813 19 6 15.187 6 10.5S9.813 2 14.5 2 23 5.813 23 10.5 19.187 19 14.5 19zm0-15C10.916 4 8 6.916 8 10.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5S18.084 4 14.5 4z"
        fill="#e95230"
        className="color000000 svgShape"
      ></path>
    </svg>
  );
};
// "line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;white-space:normal;isolation:auto;mix-blend-mode:normal;solid-color:#000;solid-opacity:1
export default FilterIcon;
