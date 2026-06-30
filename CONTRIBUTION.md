#  Contributing to Friends-Hub

Thank you for your interest in contributing to Friends-Hub! We welcome contributions from the community.

---

##  Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Communication](#communication)

---

##  Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Python 3.11+**
- **Node.js 18+** and **npm/yarn**
- **PostgreSQL 14+**
- **Redis 7+**
- **Git**

---

## 🛠 Development Setup

### 1. Fork and Clone

```bash
git clone https://github.com/your-username/Friends-Hub
cd Friends-Hub
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database and Redis credentials

# Run migrations
python -m alembic upgrade head

# Start the backend
uvicorn app.main:app --reload
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API endpoint

# Start the dev server
npm run dev
```

### 4. Redis Setup

```bash
# Start Redis locally
redis-server
```

### 5. PostgreSQL Setup

```bash
# Create database
createdb Friends-Hub_dev

# Run seed script (optional)
python scripts/seed_db.py
```

---

##  Coding Standards

### Python (Backend, AI, Fetcher)

- **Type hints are mandatory** — all functions must include type annotations
- **Docstrings required** — use Google-style docstrings
- **PEP 8 compliance** — use `black` for formatting
- **Modular design** — keep functions small and focused
- **Error handling** — use try-except blocks appropriately

Example:

```python
def process_event(event_id: str, score: float) -> dict[str, Any]:
    """Process a story event and return metadata.
    
    Args:
        event_id: Unique identifier for the event
        score: Importance score (0.0 to 1.0)
        
    Returns:
        Dictionary containing processed event data
        
    Raises:
        ValueError: If score is out of range
    """
    if not 0.0 <= score <= 1.0:
        raise ValueError("Score must be between 0 and 1")
    return {"id": event_id, "score": score}
```

### TypeScript/React (Frontend)

- **TypeScript strict mode** — no `any` types unless absolutely necessary
- **Functional components** — use hooks instead of class components
- **Tailwind CSS** — avoid inline styles, use Tailwind utility classes
- **Component structure** — keep components small and reusable

Example:

```typescript
interface EventCardProps {
  title: string;
  score: number;
  imageUrl?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ title, score, imageUrl }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">Score: {score}</p>
      {imageUrl && <img src={imageUrl} alt={title} className="mt-2 rounded" />}
    </div>
  );
};
```

---

##  Git Workflow


### Pull Request Workflow

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes** with clear commits
4. **Write/update tests** if applicable
5. **Run linters and tests locally**
6. **Push to your fork**
7. **Open a Pull Request** to `main`

---

##  Pull Request Process

### Before Submitting

- [ ] Code follows project coding standards
- [ ] All tests pass locally
- [ ] New code includes type hints and docstrings
- [ ] No sensitive data (API keys, credentials) in commits
- [ ] Documentation updated if needed

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
```

### Review Process

- PRs require at least **1 approval** from a maintainer
- Address all review comments
- Keep PRs focused — one feature/fix per PR
- Be patient and respectful during review

---

### Module-Specific Guidelines

#### Frontend
- Follow Next.js 14 app router conventions
- Use client components only when necessary
- Optimize images with Next.js Image component

#### Backend
- Use FastAPI dependency injection
- Keep routes thin, logic in services
- Use Pydantic for request/response validation

#### AI Pipeline
- Document model versions and weights
- Include training scripts where applicable
- Sanitize all prompts before generation

---

##  Communication

### Where to Ask Questions

- **GitHub Issues** — for bugs and feature requests
- **GitHub Discussions** — for general questions and ideas
- **Pull Request Comments** — for code-specific discussions

### Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on the code, not the person
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

---

##  Good First Issues

Look for issues tagged with `good-first-issue` to get started. These are beginner-friendly tasks.

---

##  Recognition

All contributors will be recognized in our [CHANGELOG.md](CHANGELOG.md) and README.

---

##  License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## ❤️ Thank You!

Every contribution, no matter how small, makes Friends-Hub better. We appreciate your time and effort!
