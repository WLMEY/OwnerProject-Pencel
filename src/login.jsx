import React, { useState, useEffect } from "react";

function TypingText({ text, delay = 100, pause = 2000 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const typeText = async () => {
      while (!isCancelled) {
        for (let i = 0; i <= text.length; i++) {
          if (isCancelled) return;
          setDisplayedText(text.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        // انتظر شوية قبل إعادة الكتابة
        await new Promise((resolve) => setTimeout(resolve, pause));
        setDisplayedText("");
      }
    };

    typeText();

    return () => {
      isCancelled = true;
    };
  }, [text, delay, pause]);

  return <span>{displayedText}</span>;
}

const Login = () => {
  return (
    <div className="log">
      <header className="header continer">
        <div>
          <img className="logo" src="../2logo.png" alt="Logo" />
        </div>
      </header>
      <main className="main">
        {/* typing animattion */}
        <section className="Animation ">
          <div className="typing">
            <TypingText text="English..." delay={100} pause={2000} />
          </div>
          <div className="cursor">|</div>
        </section>

        {/* Accounting */}

        <section className="account ">
          <div className="Login ">
            <div className="logo_login">
              <img src="../2logo.png" alt="Logo" />
            </div>
            <form className="form" action="">
              <h1>Login</h1>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="btn_login">Log in</button>
              <p>
                Don't have an account? <a href="/register">Register</a>
              </p>
            </form>
          </div>

          {/* <div className="Register continer1"></div> */}
        </section>
      </main>
    </div>
  );
};

export default Login;
