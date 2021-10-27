import request from 'request-promise';

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

  constructor(username?: string, password?: string) {
    this._username = username;
    this._password = password;
  }

  async topup(props: TopupParams) {
    const { phone, username, password, tid, amount } = props;

    let parsedPhone = '' + phone;
    parsedPhone = parsedPhone.replace(/^\+84/i, '84').replace(/^0/i, '84');

    const u = username || this._username;
    const pwd = password || this._password;
    if (!u || !pwd) throw Error('Missing username or password');

    const requestOption = {
      method: 'POST',
      url: 'https://cloudsms2.vietguys.biz:4438/api/topup/index.php',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        u: u,
        pwd: pwd,
        phone: parsedPhone,
        amount: amount,
        tid: tid,
      },
    };

    let result = await request(requestOption);

    if (result !== '00') throw new Error(`Topup failed: ${result}`);
    return result;
  }
}
