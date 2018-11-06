import { LandingRoutingModule } from './landing-routing.module';

describe('LandingRoutingModule', () => {
  let landingRoutingModule: LandingRoutingModule;

  beforeEach(() => {
    landingRoutingModule = new LandingRoutingModule();
  });

  it('should create an instance', () => {
    expect(landingRoutingModule).toBeTruthy();
  });
});
