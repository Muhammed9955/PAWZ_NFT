import './index.scss';
export default function Category({ title, children }) {
  return (
    <div className="category">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
