import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

// Define validation schema
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields>();

  const submit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("root", {
        message: "Login failed. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[cornsilk] dark:bg-[#0E141C]">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md p-8 space-y-4 bg-[#F7F18A] dark:bg-[#181C27] rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-black dark:text-white">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="py-3 px-4 block w-full border border-[#F2D161] dark:border-[#1f2533] rounded-lg text-sm focus:border-[#ffd54b] focus:ring-[#ffd54b] dark:bg-[#181C27] dark:placeholder-neutral-500 dark:text-neutral-400"
        />
        {errors.email && (
          <div className="text-sm text-red-500">{errors.email.message}</div>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="py-3 px-4 block w-full border border-[#F2D161] dark:border-[#1f2533] rounded-lg text-sm focus:border-[#ffd54b] focus:ring-[#ffd54b] dark:bg-[#181C27] dark:placeholder-neutral-500 dark:text-neutral-400"
        />
        {errors.password && (
          <div className="text-sm text-red-500">{errors.password.message}</div>
        )}

        <div className="py-2">
          <p className="dark:text-white/50 text-[#121212]">
            Don’t have an account?{" "}
            <Link className="dark:text-white text-black font-semibold ml-2 hover:underline" to={"/register"}>
              Sign up
            </Link>
          </p>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-3 px-3 gap-x-2 text-sm font-medium rounded-lg border border-[#dcb842] bg-[#F2D161] dark:bg-[#fff] hover:bg-[#ffd54b] dark:hover:bg-[#d4d4d4] text-black focus:outline-none focus:bg-[#ffd54b] disabled:opacity-50"
        >
          {isSubmitting ? <ClipLoader size={20} color="#FFF" /> : "Login"}
        </button>

        {errors.root && (
          <div className="mt-2 text-center text-sm text-red-500">
            {errors.root.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
