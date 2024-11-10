import { useForm, SubmitHandler } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  type FormFields = z.infer<typeof schema>;

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
      throw new Error();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("root", {
        message: "Invalid credentials",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        <input
          autoFocus
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <div className="text-sm text-red-500">{errors.email.message}</div>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.password && (
          <div className="text-sm text-red-500">{errors.password.message}</div>
        )}

        <p className="signup">
          Don't have an account?
          <a id="sign-up" rel="noopener noreferrer" href="#" >
            Sign up
          </a>
        </p>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? <ClipLoader size={20} color="#FFF" /> : "Submit"}
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
