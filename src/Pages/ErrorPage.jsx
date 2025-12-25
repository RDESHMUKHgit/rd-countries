import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const status = error?.status || 404;
  const message =
    error?.message ||
    error?.statusText ||
    'Something went wrong. The page you’re looking for doesn’t exist.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-6">
      <div className="max-w-md text-center">
        {/* Status Code */}
        <h1 className="text-7xl font-extrabold bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          {status}
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold">
          Oops! Something went wrong
        </h2>

        {/* Message */}
        <p className="mt-3 text-slate-400 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Go back
          </button>

          <button
            onClick={() => navigate('/', { replace: true })}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
