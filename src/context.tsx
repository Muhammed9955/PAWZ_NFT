import React, { createContext, useState } from 'react';

interface ITypes {
  setFiles: any;
  files: any;
}

const contextDefaultValues: ITypes = {
  setFiles: () => {},
  files: [],
};

export const FileContext = createContext<ITypes>(contextDefaultValues);

const FileProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState([]);

  return (
    <FileContext.Provider
      value={{
        setFiles,
        files,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;
