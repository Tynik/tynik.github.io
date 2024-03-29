export type NetlifyFunction =
  | 'auth'
  | 'get-post'
  | 'get-post-by-slug'
  | 'create-draft-post'
  | 'restore-post'
  | 'update-post'
  | 'get-published-posts'
  | 'get-draft-posts'
  | 'get-archived-posts'
  | 'upload-post-file'
  | 'make-offer';

export type NetlifyResponse<Response> = {
  status: string;
  data: Response;
};

type NetlifyRequestOptions<Payload> = {
  payload?: Payload;
  method?: 'POST' | 'GET' | 'UPDATE' | 'PUT' | 'DELETE';
  params?: Record<string, string>;
};

export const netlifyRequest = async <Response, Payload = any>(
  funcName: NetlifyFunction,
  { payload, method = 'GET', params = {} }: NetlifyRequestOptions<Payload> = {}
) => {
  let body: BodyInit | null = null;

  if (payload instanceof FormData) {
    body = payload;
    //
  } else if (payload) {
    body = JSON.stringify(payload);
  }

  const response = await fetch(
    `${process.env.NETLIFY_SERVER || ''}/.netlify/functions/${funcName}?${new URLSearchParams(
      params
    ).toString()}`,
    {
      method,
      body,
    }
  );

  if (!response.ok) {
    return Promise.reject(await response.json());
  }

  return (await response.json()) as NetlifyResponse<Response>;
};
