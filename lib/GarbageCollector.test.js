const GarbageCollector = require('./GarbageCollector')

describe('GarbageCollector', () => {
  const timenow = 'Thu Apr 26 2018 20:00:00 GMT+0000 (UTC)'

  // 15 hours old, no name
  const shouldBeRemoved = {
    rfid: 'deleteme',
    name: '',
    addedat: 'Thu Apr 26 2018 05:00:00 GMT+0000 (UTC)',
    del: () => { console.log('deleted') }
  }

  // 15 hours old, has name
  const shouldNotBeRemoved = {
    rfid: 'keepme',
    name: 'name',
    addedat: 'Thu Apr 26 2018 05:00:00 GMT+0000 (UTC)',
    del: () => {}
  }

  // 11 hour old, no name
  const shouldNotBeRemovedYet = {
    rfid: 'keepme',
    name: '',
    addedat: 'Thu Apr 26 2018 09:00:00 GMT+0000 (UTC)',
    del: () => {}
  }

  const whitelistMock = {
    getAll: () => [shouldBeRemoved, shouldNotBeRemoved, shouldNotBeRemovedYet]
  }

  test('Deletes entries that are unnamed and > 12 hours old', async () => {
    const gc = new GarbageCollector(whitelistMock)

    const spyShouldBeRemoved = jest.spyOn(shouldBeRemoved, 'del')
    const spyShouldNotBeRemoved = jest.spyOn(shouldNotBeRemoved, 'del')
    const spyShouldNotBeRemovedYet = jest.spyOn(shouldNotBeRemovedYet, 'del')

    await gc.cleanup(timenow)

    expect(spyShouldBeRemoved).toHaveBeenCalled()
    expect(spyShouldNotBeRemoved).not.toHaveBeenCalled()
    expect(spyShouldNotBeRemovedYet).not.toHaveBeenCalled()

    jest.resetAllMocks()
    jest.restoreAllMocks()
  })
})
