const GarbageCollector = require('./GarbageCollector')

describe('GarbageCollector', () => {
  const timenow = '2018-04-24 20:00:00'

  // 15 hours old, no name
  const shouldBeRemoved = {
    rfid: 'deleteme',
    name: '',
    addedat: '2018-04-24 05:00:00',
    del: () => { console.log('deleted') }
  }

  // 15 hours old, has name
  const shouldNotBeRemoved = {
    rfid: 'keepme',
    name: 'name',
    addedat: '2018-04-24 05:00:00',
    del: () => {}
  }

  // 11 hour old, no name
  const shouldNotBeRemovedYet = {
    rfid: 'keepme',
    name: '',
    addedat: '2018-04-24 09:00:00',
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
