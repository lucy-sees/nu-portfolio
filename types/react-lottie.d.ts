// @/types/react-lottie.d.ts
declare module 'react-lottie' {
    import { Component } from 'react';
  
    interface LottieProps {
      options: any; // You can define a more specific type if needed
      height?: number;
      width?: number;
      isStopped?: boolean;
      isPaused?: boolean;
      eventListeners?: any[];
    }
  
    export default class Lottie extends Component<LottieProps> {}
  }