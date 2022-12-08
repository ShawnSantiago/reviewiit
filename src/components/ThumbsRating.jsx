//<span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full mb-3 ">Sentiment Score: {Math.round(listitem.sentimentScore * 100)}</span>

function ThumbRating(props) {
  return (
    <svg
      className={
        props.score < 0
          ? "w-6 h-6 transform rotate-180 fill-current text-white rounded-full bg-red-500 p-1"
          : "fill-current text-white rounded-full bg-green-500 p-1 w-6 h-6"
      }
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
    >
      <path d="M64 38.5c0-1.6-.5-3.2-1.5-4.5 1.3-1.7 1.8-3.8 1.4-5.9-.7-3.5-3.9-6.1-7.6-6.1h-14c.3-2 .7-4.6.7-7.1 0-6.1-1.9-10.2-6-12.7s-8.8-.2-9-.1l-1.2.6L28 14.5l-8 15.1c-.6-.3-1.3-.6-2-.6H4c-2.2 0-4 1.8-4 4v26c0 2.2 1.8 4 4 4h14c1.5 0 2.9-.9 3.5-2.2 1.3.8 2.9 1.2 4.5 1.2h24.3c3.9 0 7.1-2.8 7.6-6.5.1-.8.1-1.6 0-2.4 2.5-1.3 4.1-3.8 4.1-6.7 0-.9-.1-1.7-.4-2.5 1.5-1.3 2.4-3.3 2.4-5.4zM18 59H4V33h14v26zm40.1-17.4-2 1 1.3 1.9c.4.6.6 1.3.6 2 0 1.7-1.3 3.2-3 3.5l-2.8.4 1.3 2.5c.3.7.5 1.4.4 2.1-.2 1.7-1.8 3-3.7 3H26c-1.9 0-4-1.1-4-3V34.4l9.6-18.3c.3-.5.4-1.1.3-1.7l-.8-9.2c1-.3 2.6-.4 3.8.3 2.8 1.7 4 4.7 4 9.3 0 2.4-.4 4.9-.7 6.8-.1.9-.2 1.6-.3 2.1l-.1 2.3h18.5c1.8 0 3.3 1.2 3.6 2.8.3 1.4-.3 2.7-1.4 3.5L56.2 34l2.3 1.6c.9.7 1.5 1.7 1.5 2.9 0 1.3-.7 2.5-1.9 3.1z" />
    </svg>
  );
}
export default ThumbRating;
