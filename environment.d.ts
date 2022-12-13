declare global {
  namespace NodeJs {
    interface ProcessEnv {
      production: "DEV" | "PROD";
      PORT?: string;
    }
  }
}

export {};
