import { signIn, useSession } from "next-auth/client";

export default function Home() {
	const [session] = useSession();

	{
		session ? (
			<div>
			    wazzup
			</div>
		) : (
			(window.location.href = "/admin")
		);
	}
}
