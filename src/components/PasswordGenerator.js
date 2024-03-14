import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);

  const getRandomInt = useCallback((max) => {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] % max;
  }, []);

  const ensureComplexity = useCallback(
    (characterSetsIncluded) => {
      let tempPassword = "";
      characterSetsIncluded.forEach((set) => {
        tempPassword += set[getRandomInt(set.length)];
      });
      return tempPassword;
    },
    [getRandomInt]
  );

  const generatePassword = useCallback(() => {
    const symbols = "!@#$%^&*()_+{}:\"<>?[];,'.`~";
    const numbers = "0123456789";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let characterSet = "";
    const characterSetsIncluded = [];
    if (includeSymbols) {
      characterSet += symbols;
      characterSetsIncluded.push(symbols);
    }
    if (includeNumbers) {
      characterSet += numbers;
      characterSetsIncluded.push(numbers);
    }
    if (includeUppercase) {
      characterSet += uppercase;
      characterSetsIncluded.push(uppercase);
    }
    if (characterSetsIncluded.length === 0 || characterSet === "") {
      characterSet = lowercase;
      characterSetsIncluded.push(lowercase);
    } else {
      characterSet += lowercase;
    }

    let newPassword = ensureComplexity(characterSetsIncluded);
    for (let i = newPassword.length; i < length; i++) {
      const randomIndex = getRandomInt(characterSet.length);
      newPassword += characterSet[randomIndex];
    }
    setPassword(
      newPassword
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("")
    );
  }, [
    length,
    includeSymbols,
    includeNumbers,
    includeUppercase,
    ensureComplexity,
    getRandomInt,
  ]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="password-generator">
      <h2>Random Password Generator</h2>
      <div className="settings">
        <div className="setting">
          <label htmlFor="password-length">Password Length:</label>
          <input
            id="password-length"
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
          />
          <span className="length-display">{length}</span>
        </div>
        <div className="setting">
          <input
            id="include-symbols"
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <label htmlFor="include-symbols">Include Symbols</label>
        </div>
        <div className="setting">
          <input
            id="include-numbers"
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <label htmlFor="include-numbers">Include Numbers</label>
        </div>
        <div className="setting">
          <input
            id="include-uppercase"
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <label htmlFor="include-uppercase">Include Uppercase Letters</label>
        </div>
      </div>
      <div
        className="password-display"
        onClick={() =>
          navigator.clipboard
            .writeText(password)
            .then(() => alert("Password copied to clipboard!"))
        }
        style={{ cursor: "pointer" }}
      >
        {password || "Click to Generate Password"}
      </div>
      {password && (
        <div
          className="regenerate-icon"
          onClick={generatePassword}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faSyncAlt} />
        </div>
      )}
      <p className="copy-instruction">
        Click on the password to copy it to clipboard. Click the regenerate icon
        to generate a new password.
      </p>
    </div>
  );
};

export default PasswordGenerator;
