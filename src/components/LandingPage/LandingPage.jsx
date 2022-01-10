import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('NFT Randomizer - How it works.');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            This app is for digital artists wanting to randomize their NFT photoshop
            layers and attributes. Eliminating one hurdle on the way to getting user's
            art onto a blockchain. This app takes in layer names, attribute names,
            desired rarity values, and the amount to be minted and returns the user
            a randomized CSV file with each row gauranteed to be unique. The user can
            then plug the CSV file into photoshop and watch their NFTs come to life.
          </p>

          <p>
            To get started, register an account and login.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
