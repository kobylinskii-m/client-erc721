import { DeployCollection } from "@components/templates/collecions/deploy-collection";
import { Footer } from "@components/templates/footer/footer";
import { Header } from "@components/templates/layout/header";
import { TokenMetadata } from "@components/templates/metadata/token-metadata";
import "@styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer as ReactToastify } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const Index: React.FC = () => {
  const [collectionAddress, setCollectionAddress] = React.useState<string>("");

  return (
    <React.StrictMode>
      <Header />
      <div className="flex flex-col space-y-8 max-w-[728px] min-w-[728px] mx-auto pb-20 bg-[#f3f3f3] mt-5">
        <DeployCollection
          collectionAddress={collectionAddress}
          setCollectionAddress={setCollectionAddress}
        />
        <div className="divider"></div>
        <TokenMetadata collectionAddress={collectionAddress} />
      </div>
      <Footer />
    </React.StrictMode>
  );
};

root.render(
  <>
    <Index />
    <ReactToastify
      newestOnTop={false}
      autoClose={6000}
      position="bottom-right"
    />
  </>
);

reportWebVitals();
