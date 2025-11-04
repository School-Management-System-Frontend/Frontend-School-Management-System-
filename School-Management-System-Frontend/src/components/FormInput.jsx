import React from 'react';
import styled from 'styled-components';

const Input = ({ 
  label = "Username", 
  type = "text", 
  value, 
  onChange, 
  placeholder,
  width = "190px"
}) => {
    const handleChange = (e) => {
    let val = e.target.value;

    if (type === "tel") {
      // Remove any non-digit characters
      val = val.replace(/\D/g, "");

      // Limit to 10 digits max
      if (val.length > 10) val = val.slice(0, 10);
    }

    onChange({ target: { value: val } });
  };
  return (
    <StyledWrapper width={width}>
      <div className="form-control">
        <input type={type} required value={value} onChange={handleChange} placeholder={placeholder || ''} inputMode={type === "tel" ? "numeric" : "text"}
          maxLength={type === "tel" ? 10 : undefined} minLength={type === "tel" ? 10 : undefined} pattern={type === "tel" ? "\\d{10}" : undefined} />
        <label>
          {label.split("").map((letter, index) => (
            <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>{letter}</span>
          ))}
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    margin: 20px 0 40px;
    width: ${({ width }) => width}; /* 👈 dynamic width */
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px black solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    color: white;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: blue;
    color: black;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: blue;
    font-weight: bold;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: blue;
    transform: translateY(-30px);
  }
`;

export default Input;
