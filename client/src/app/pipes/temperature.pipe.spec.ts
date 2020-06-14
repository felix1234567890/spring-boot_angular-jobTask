import { TempPipe } from './temperature.pipe';

describe('TemperaturePipe', () => {
  it('create an instance', () => {
    const pipe = new TempPipe();
    expect(pipe).toBeTruthy();
  });
});
