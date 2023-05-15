
import { Note } from "../../types/chords";
import { getChordNotes } from "../get-chord";
import { describe, it, assert } from "vitest";

describe('getChordNotes', () => {
    it("getChordNotes should return the correct notes for a major chord", () => {
      const notes = getChordNotes("C", "maj");
      assert.deepEqual(notes, ["C", "E", "G"]);
    });
    
    it("getChordNotes should return the correct notes for a minor chord", () => {
      const notes = getChordNotes("A#", "min");
      assert.deepEqual(notes, ["A#", "C#", "F"]);
    });
    
    it("getChordNotes should return the correct notes for a diminished chord", () => {
      const notes = getChordNotes("G", "dim");
      assert.deepEqual(notes, ["G", "A#", "C#"]);
    });
    
    it("getChordNotes should throw an error for an invalid root note", () => {
      assert.throws(() => {
        getChordNotes("H" as Note, "maj");
      }, /Invalid root note/);
    });
    
    it("getChordNotes should throw an error for an invalid harmonic mode", () => {
      assert.throws(() => {
        getChordNotes("C", "foo" as any);
      }, /Invalid harmonic mode/);
    });
})
