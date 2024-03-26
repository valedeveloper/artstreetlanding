import { useRouter } from "next/router"
import { toast } from "sonner"

export const useAuth = () => {
    const router = useRouter()
    const signOut = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (!res.ok) throw new Error()
            toast.success("Sesión cerrada con éxito")
            router.push("/signin")
        } catch (error) {
            toast.error("No se ha podido cerrar sesión, intente de nuevo")
        }
    }
    return {
        signOut
    }
}