import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage: React.FC = () => {
	return (
		<main className="auth-page">
			<SignUp />
		</main>
	);
};

export default SignUpPage;
