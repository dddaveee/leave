import { Button, Snackbar, TextField } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import LockIcon from "@material-ui/icons/Lock";
import { isEmpty } from "ramda";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import MuiAlert from "@material-ui/lab/Alert";

const Login = () => {
  const [password, setPassword] = useState("");
  const { login } = useLocalStorage();
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleLogin = () => {
    const success = login(password);

    if (!success) {
      setShowPasswordError(true);
      setPassword("");
    }
  };

  return (
    <PageWrapper>
      <Wrapper>
        <Unlock />
        <div>請輸入密碼解鎖</div>
        <InputWrapper
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <ButtonWrapper>
            <Button
              variant="contained"
              color="secondary"
              disabled={isEmpty(password)}
              type="submit"
            >
              解鎖
            </Button>
          </ButtonWrapper>
        </InputWrapper>
      </Wrapper>
      <Snackbar
        open={showPasswordError}
        autoHideDuration={2000}
        onClose={() => {
          setShowPasswordError(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          密碼錯誤
        </MuiAlert>
      </Snackbar>
    </PageWrapper>
  );
};

export default Login;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  justify-content: center;
  vertical-align: middle;
  flex-direction: column;
  text-align: center;
`;

const Unlock = styled(LockIcon)`
  margin: 0 auto 32px auto;
`;

const ButtonWrapper = styled.div`
  margin-top: 12px;
`;

const InputWrapper = styled.form`
  font-size: 12px;
  margin: 24px 0;

  & input {
    text-align: center;
  }
`;
