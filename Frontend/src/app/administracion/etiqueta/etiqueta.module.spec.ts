import { EtiquetaModule } from './etiqueta.module';

describe('EtiquetaModule', () => {
  let etiquetaModule: EtiquetaModule;

  beforeEach(() => {
    etiquetaModule = new EtiquetaModule();
  });

  it('should create an instance', () => {
    expect(etiquetaModule).toBeTruthy();
  });
});
