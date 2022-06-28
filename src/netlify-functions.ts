export type NetlifyResponse = {
  status: string;
};

export type NetlifyMakeOffer = {
  company: string;
  name: string;
  contact: string;
  salaryRange: string;
  desc: string;
};

export const netlifyMakeOffer = async (data: NetlifyMakeOffer) =>
  (await (
    await fetch(`${process.env.NETLIFY_SERVER || ''}/.netlify/functions/make-offer`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  ).json()) as Promise<NetlifyResponse>;
