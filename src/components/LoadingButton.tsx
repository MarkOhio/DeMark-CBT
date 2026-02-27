// no React import needed due to new JSX transform
import "./LoadingButton.css";

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function LoadingButton({ loading = false, children, ...rest }: LoadingButtonProps) {
  return (
    <button className="loading-button" disabled={loading || rest.disabled} {...rest}>
      {loading ? <span className="spinner" /> : children}
    </button>
  );
}
