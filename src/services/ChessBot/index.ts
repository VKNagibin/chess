import { ChessApi } from '@/services/api/lichessApi';
import Logger from '@/services/Logger';
import { IBaseResponse } from '@/shared/services/types';
import { DifficultyLevel } from '@/store/slices/cells/types';

class ChessBot {
  private static instance: ChessBot;

  public static getInstance(): ChessBot {
    if (!ChessBot.instance) {
      ChessBot.instance = new ChessBot();
    }
    return ChessBot.instance;
  }

  public async getBestMove({
    FEN,
    difficulty = DifficultyLevel.INTERMEDIATE,
  }: {
    FEN: string;
    difficulty?: DifficultyLevel;
  }): Promise<IBaseResponse<string> | undefined> {
    try {
      return await ChessApi.post<IBaseResponse<string>>('best-move', {
        fen: FEN,
        difficulty,
      });
    } catch (error) {
      Logger.error('Error fetching step:', error);
    }
  }
}

export default ChessBot.getInstance();
