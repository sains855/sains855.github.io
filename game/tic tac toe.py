import pygame
import sys
import random

# Inisialisasi pygame
pygame.init()

# Konstanta
WIDTH, HEIGHT = 300, 350  # Tambahkan ruang untuk menampilkan level
LINE_WIDTH = 5
BOARD_ROWS = 3
BOARD_COLS = 3
SQUARE_SIZE = 100
CIRCLE_RADIUS = SQUARE_SIZE // 3
CIRCLE_WIDTH = 5
CROSS_WIDTH = 5
SPACE = SQUARE_SIZE // 4
FONT = pygame.font.Font(None, 30)

# Warna
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (200, 0, 0)
BLUE = (0, 0, 200)

# Inisialisasi layar
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tic Tac Toe")
screen.fill(WHITE)

# Variabel game
board = [[None] * BOARD_COLS for _ in range(BOARD_ROWS)]
player = 'X'
level = 1  # Level awal AI
running = True


def draw_lines():
    for i in range(1, BOARD_ROWS):
        pygame.draw.line(screen, BLACK, (0, i * SQUARE_SIZE), (WIDTH, i * SQUARE_SIZE), LINE_WIDTH)
    for i in range(1, BOARD_COLS):
        pygame.draw.line(screen, BLACK, (i * SQUARE_SIZE, 0), (i * SQUARE_SIZE, HEIGHT - 50), LINE_WIDTH)


def draw_figures():
    for row in range(BOARD_ROWS):
        for col in range(BOARD_COLS):
            if board[row][col] == 'O':
                pygame.draw.circle(screen, BLUE, (col * SQUARE_SIZE + SQUARE_SIZE // 2, row * SQUARE_SIZE + SQUARE_SIZE // 2), CIRCLE_RADIUS, CIRCLE_WIDTH)
            elif board[row][col] == 'X':
                pygame.draw.line(screen, RED, (col * SQUARE_SIZE + SPACE, row * SQUARE_SIZE + SPACE), (col * SQUARE_SIZE + SQUARE_SIZE - SPACE, row * SQUARE_SIZE + SQUARE_SIZE - SPACE), CROSS_WIDTH)
                pygame.draw.line(screen, RED, (col * SQUARE_SIZE + SPACE, row * SQUARE_SIZE + SQUARE_SIZE - SPACE), (col * SQUARE_SIZE + SQUARE_SIZE - SPACE, row * SQUARE_SIZE + SPACE), CROSS_WIDTH)


def check_winner():
    for row in range(BOARD_ROWS):
        if board[row][0] == board[row][1] == board[row][2] and board[row][0] is not None:
            return board[row][0]
    
    for col in range(BOARD_COLS):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] is not None:
            return board[0][col]
    
    if board[0][0] == board[1][1] == board[2][2] and board[0][0] is not None:
        return board[0][0]
    
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] is not None:
        return board[0][2]
    
    return None


def restart_game():
    global board, player, level
    board = [[None] * BOARD_COLS for _ in range(BOARD_ROWS)]
    screen.fill(WHITE)
    draw_lines()
    player = 'X'


def draw_level():
    text = FONT.render(f"Level: {level}", True, BLACK)
    screen.blit(text, (10, HEIGHT - 40))


def is_board_full():
    return all(board[row][col] is not None for row in range(BOARD_ROWS) for col in range(BOARD_COLS))


def ai_move():
    empty_cells = [(row, col) for row in range(BOARD_ROWS) for col in range(BOARD_COLS) if board[row][col] is None]
    if empty_cells:
        row, col = random.choice(empty_cells)
        board[row][col] = 'O'


draw_lines()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        if event.type == pygame.MOUSEBUTTONDOWN and player == 'X':
            x, y = event.pos
            row, col = y // SQUARE_SIZE, x // SQUARE_SIZE
            
            if row < BOARD_ROWS and col < BOARD_COLS and board[row][col] is None:
                board[row][col] = player
                winner = check_winner()
                if winner:
                    print(f"{winner} wins!")
                    pygame.time.delay(1000)
                    if winner == 'X':
                        level = min(level + 1, 5)  # Naik level maksimal ke 5
                    restart_game()
                elif is_board_full():
                    print("Game Draw!")
                    pygame.time.delay(1000)
                    restart_game()
                else:
                    player = 'O'
                    ai_move()
                    winner = check_winner()
                    if winner:
                        print(f"{winner} wins!")
                        pygame.time.delay(1000)
                        restart_game()
                    elif is_board_full():
                        print("Game Draw!")
                        pygame.time.delay(1000)
                        restart_game()
                    else:
                        player = 'X'
    
    draw_figures()
    draw_level()
    pygame.display.update()

pygame.quit()
sys.exit()
