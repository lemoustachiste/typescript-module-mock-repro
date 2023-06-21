import FileUpload from '../src/FileUpload';

describe(' component test suite', function () {
  describe('given the hideFileUpload option is true', function () {
    it('should return null', function () {
      const instance = FileUpload({ hideFileUpload: true });
      expect(instance).toBeNull();
    });
  });
});
