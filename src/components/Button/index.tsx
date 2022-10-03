import { MouseEventHandler } from "react";
import styles from "./Button.module.css";

type Props = {
  variant?: string;
  text?: string;
  children?: JSX.Element;
  loading?: boolean;
  onClick?: (e: MouseEventHandler<HTMLButtonElement>) => void;
};

export const Button: React.FC<Props> = ({ variant = "primary", text, children, loading, onClick }) => {
  const classes = `${styles.button} ${styles[variant]}`;

  if (loading) {
    return (
      <button className={classes} >
        <i className="fas fa-cog fa-spin"></i>
      </button>
    )
  }

  return (
    <button className={classes} onClick={onClick}>
      {text || children}
    </button>
  );
};

export const GoingButton: React.FC<Props> = (props) => {
  return (
    <Button {...props} variant="going">
      <i className="fa-solid fa-check"></i>
    </Button>
  );
};

export const JoinButton: React.FC<Props> = (props) => {
  return (
    <Button {...props} variant="join">
      <i className="fa-solid fa-plus"></i>
    </Button>
  );
};