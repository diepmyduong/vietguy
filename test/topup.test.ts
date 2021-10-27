import { VietGuy } from '../src';
test('topup', async () => {
  const vietguy = new VietGuy('username', 'passwordd');

  const result = await vietguy
    .topup({
      phone: '0916968263',
      amount: 10000,
      tid: 'duong-test',
    })
    .catch(err => {
      console.log('call error', err);
    });

  console.log('result', result);

  expect(result).toEqual('00');
});
