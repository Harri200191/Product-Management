import React, { Component } from 'react';
import { Howl } from 'howler';

// Define the HOC function
const Sound = (WrappedComponent, soundFile) => {
  return class extends Component {
    playSound = () => {
      const sound = new Howl({
        src: [soundFile],
      });
      sound.play();
      sound.on('load', () => { 
      });
      
      sound.on('playerror', (id, error) => {
        console.error('Error playing sound:', error);
      });
      
      sound.play(); 
      
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onClick={() => {
            this.playSound();
            if (this.props.onClick) {
              this.props.onClick();
            }
          }}
        />
      );
    }
  };
};

export default Sound;
