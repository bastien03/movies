export const FAKE_PROMISE = {
  then: x => x(),
};

export const DISPATCH = jasmine.createSpy('dispatch').and.callFake(() => FAKE_PROMISE);

export const ROUTER_MOCK = {
  push: (x) => x,
};

export function spyRouter() {
  spyOn(ROUTER_MOCK, 'push');
}

export function cleanRouter() {
  ROUTER_MOCK.push.calls.reset();
}
