// src/utils.test.ts
import { getFlagClassName, getProjectStateLabel } from '../../utility';
import { ProjectState } from "../../types/project";

describe('Utility Functions', () => {
    const mockStyles = {
        launched: 'flag-launched',
        finished: 'flag-finished',
        notStarted: 'flag-notStarted',
    };

    describe('getFlagClassName', () => {
        it('should return the correct class name for LAUNCHED state', () => {
            expect(getFlagClassName(ProjectState.LAUNCHED, mockStyles)).toBe('flag-launched');
        });

        it('should return the correct class name for FINISHED state', () => {
            expect(getFlagClassName(ProjectState.FINISHED, mockStyles)).toBe('flag-finished');
        });

        it('should return the correct class name for NOT_STARTED state', () => {
            expect(getFlagClassName(ProjectState.NOT_STARTED, mockStyles)).toBe('flag-notStarted');
        });

        it('should return null for an unknown state', () => {
            expect(getFlagClassName('unknown' as ProjectState, mockStyles)).toBeNull();
        });
    });

    describe('getProjectStateLabel', () => {
        it('should return "Launched" for LAUNCHED state', () => {
            expect(getProjectStateLabel(ProjectState.LAUNCHED)).toBe('Launched');
        });

        it('should return "Finished" for FINISHED state', () => {
            expect(getProjectStateLabel(ProjectState.FINISHED)).toBe('Finished');
        });

        it('should return "Not started" for NOT_STARTED state', () => {
            expect(getProjectStateLabel(ProjectState.NOT_STARTED)).toBe('Not started');
        });

        it('should return null for an unknown state', () => {
            expect(getProjectStateLabel('unknown' as ProjectState)).toBeNull();
        });
    });
});
