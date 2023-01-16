import {describe, expect, test} from '@jest/globals';
import {getByFilter} from '../models/games.js';



describe('', () => {
    test('test handles empty args', () => {
        const [query, params] = getByFilter(null, null, null, null, null)
        expect(query).toBe('SELECT * FROM games;')
        expect(params).toEqual([])
    });

    test('test handles difficulty', () => {
        const [query, params] = getByFilter("easy", null, null, null, null)
        expect(query).toBe('SELECT * FROM games WHERE difficulty = $1;')
        expect(params).toEqual(["easy"])
    });

    test('test handles number of players', () => {
        const [query, params] = getByFilter(null, 4, null, null, null)
        expect(query).toBe('SELECT * FROM games WHERE minimum_players <= $1 AND maximum_players >= $1;')
        expect(params).toEqual([4])
    });

    test('test handles age', () => {
        const [query, params] = getByFilter(null, null, 10, null, null)
        expect(query).toBe('SELECT * FROM games WHERE minimum_age <= $1;')
        expect(params).toEqual([10])
    });

    test('test handles duration', () => {
        const [query, params] = getByFilter(null, null, null, 90, null)
        expect(query).toBe('SELECT * FROM games WHERE duration <= $1;')
        expect(params).toEqual([90])
    });

    test('test handles genre', () => {
        const [query, params] = getByFilter(null, null, null, null, "genre")
        expect(query).toBe('SELECT * FROM games WHERE $1 = ANY(genre);')
        expect(params).toEqual(["genre"])
    });

    test('handles all together', () => {
        const [query, params] = getByFilter("easy", 4, 10, 90, "genre")
        expect(query).toBe('SELECT * FROM games WHERE difficulty = $1 AND minimum_players <= $2 AND maximum_players >= $2 AND minimum_age <= $3 AND duration <= $4 AND $5 = ANY(genre);')
        expect(params).toEqual(["easy", 4, 10, 90, "genre"])
    })
  });