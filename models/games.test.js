import { getByFilter } from "./games";

describe('', () => {
    test('test handles empty args', () => {
        const [query, params] = getByFilter(null, null, null, null, null)
        expect(query).toBe('SELECT * FROM games;')
        expect(params).toEqual([])
    });})