const Contador = () => {

  const [counter, setCounter] = React.useState(0);

  const add = () => setCounter(counter + 1);
  const sub = () => setCounter(counter - 1);
  const actualClass = () =>
    counter > 5 ? "sucess" : counter > 2 ? "warning" : "danger";

  return (
    <div className="counter-container">
      <button className="counter-container__button btn" onClick={sub} aria-label="substract"> <i className="fas fa-minus"></i> </button>
      <h1 className={ `counter-container__counter ${actualClass()}`}>{counter}</h1>
      <button className="counter-container__button btn" onClick={add} aria-label="add"> <i className="fas fa-plus"></i> </button>
    </div>
  );
};