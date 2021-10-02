import { colors } from "../../styles/theme";

const Button = ({ children, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{children}</button>

      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.black};
          border-radius: 9999px;
          border: 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          font-size: 16px;
          font-weight: 800;
          justify-content: space-between;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          width: auto;
        }

        button > :global(svg),
        :global(span) {
          margin: 0 8px;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
};

export default Button;
