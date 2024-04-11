
export function AddLink({ size = 32, fill = "#fff" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      data-name="Layer 1"
      viewBox="0 0 24 24"
      id="add-link"
    >
      <path d="m12.11 15.39-3.88 3.88a2.47 2.47 0 0 1-3.5 0 2.46 2.46 0 0 1 0-3.5l3.88-3.88a1 1 0 1 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 0 0-1.42-1.42Zm-3.28-.22a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.92-4.92a1 1 0 1 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42ZM21 18h-1v-1a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0-2Zm-4.19-4.47 3.88-3.89a4.48 4.48 0 0 0-6.33-6.33l-3.89 3.88a1 1 0 1 0 1.42 1.42l3.88-3.88a2.47 2.47 0 0 1 3.5 0 2.46 2.46 0 0 1 0 3.5l-3.88 3.88a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0Z"></path>
    </svg>
  );
}

export function ExteranlLink({ size = 32, fill = "#fff" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
      id="external-link"
    >
      <path d="M18,10.82a1,1,0,0,0-1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8A1,1,0,0,1,5,7h7.18a1,1,0,0,0,0-2H5A3,3,0,0,0,2,8V19a3,3,0,0,0,3,3H16a3,3,0,0,0,3-3V11.82A1,1,0,0,0,18,10.82Zm3.92-8.2a1,1,0,0,0-.54-.54A1,1,0,0,0,21,2H15a1,1,0,0,0,0,2h3.59L8.29,14.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L20,5.41V9a1,1,0,0,0,2,0V3A1,1,0,0,0,21.92,2.62Z"></path>
    </svg>
  );
}

export function RemoveItemIcon({ size = 32, fill = "#fff" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="transparent"
      viewBox="0 0 1024 1024"
      id="close"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M512.001 529.678L679.715 697.392L697.393 679.715L529.679 512L697.84 343.839L680.162 326.161L512.001 494.322L343.84 326.161L326.162 343.839L494.323 512L326.609 679.715L344.286 697.392L512.001 529.678Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
