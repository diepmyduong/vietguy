import Axios, { AxiosInstance } from 'axios';

type TopupParams = {
  phone: string;
  amount: number;
  tid: string;
  username?: string;
  password?: string;
};

export class VietGuy {
  private _username?: string;
  private _password?: string;
  private _api: AxiosInstance;

  constructor(username?: string, password?: string) {
    this._username = username;
    this._password = password;
    this._api = Axios.create({
      baseURL: `https://cloudsms2.vietguys.biz:4438/api/topup/index.php`,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  async topup(props: TopupParams) {
    const { phone, username, password, tid, amount } = props;

    let parsedPhone = '' + phone;
    parsedPhone = parsedPhone.replace(/^\+84/i, '84').replace(/^0/i, '84');

    const u = username || this._username;
    const pwd = password || this._password;
    if (!u || !pwd) throw Error('Missing username or password');

    const result = await this._api
      .get(`/`, {
        params: { u, pwd, amount, tid, phone: parsedPhone },
      })
      .then(res => res.data);

    if (result !== '00') {
      console.log('topup failed', result);
      throw new Error(`Topup failed`);
    }
    return result;
  }
}
