import React, { useState, useEffect } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Timer = () => {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(10);
  const [message , setMessage] = useState('')
  const [value , setValue] = useState('')
  const [copied,setCopied] = useState(false)

  useEffect(() => {
    let timer = setInterval(() => {
      if (second === 0) {
        if (minute === 0) {
          clearInterval(timer);
          setMessage("Time is over")
        } else {
          setSecond(59);
          setMinute(minute - 1);
        }
      } else {
        setSecond(second - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [second, minute]);

  return (
    <div>
 {message ?<stong>{message}</stong>  : <strong>{`${minute < 10 ? '0' + minute : minute}m:${second < 10 ? '0' + second : second}s left`}</strong> }

 <form>
        <div>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
            <button>Copy</button>
          </CopyToClipboard>
        </div>
      </form>
    </div>
  );
};

export default Timer;
