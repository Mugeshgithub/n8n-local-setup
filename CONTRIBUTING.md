# Contributing to n8n Local Setup

Thank you for your interest in contributing to the n8n Local Setup project! This guide will help you get started.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the GitHub repository page
- Clone your fork locally:
  ```bash
  git clone https://github.com/your-username/n8n-local-setup.git
  cd n8n-local-setup
  ```

### 2. Create a Branch
- Create a new branch for your feature or bugfix:
  ```bash
  git checkout -b feature/your-feature-name
  # or
  git checkout -b bugfix/your-bugfix-name
  ```

### 3. Make Your Changes
- Make your changes to the code
- Test your changes thoroughly
- Update documentation if needed
- Follow the coding standards below

### 4. Test Your Changes
- Run the setup script to ensure it works:
  ```bash
  ./setup.sh
  ```
- Test the startup script:
  ```bash
  ./start-n8n.sh
  ```
- Verify n8n starts correctly and is accessible

### 5. Commit Your Changes
- Use clear, descriptive commit messages:
  ```bash
  git add .
  git commit -m "Add feature: brief description of what you added"
  ```

### 6. Push and Create Pull Request
- Push your changes to your fork:
  ```bash
  git push origin feature/your-feature-name
  ```
- Create a Pull Request on GitHub

## 📋 Coding Standards

### Shell Scripts
- Use `#!/bin/bash` shebang
- Add comments explaining complex logic
- Use meaningful variable names
- Handle errors gracefully with proper exit codes
- Use consistent indentation (2 spaces)

### Documentation
- Use clear, concise language
- Include examples where helpful
- Keep README.md updated
- Add comments to complex configurations

### File Structure
- Keep the project structure clean and organized
- Use descriptive file names
- Group related files together
- Follow the existing naming conventions

## 🐛 Reporting Issues

### Before Reporting
1. Check if the issue already exists
2. Try the latest version
3. Check the troubleshooting section in README.md

### When Reporting
Include the following information:
- **OS**: macOS/Linux/Windows version
- **Node.js version**: `node -v`
- **npm version**: `npm -v`
- **Error message**: Full error output
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens

### Issue Template
```markdown
## Bug Report

**OS**: 
**Node.js version**: 
**npm version**: 
**n8n version**: 

### Description
Brief description of the issue.

### Steps to Reproduce
1. 
2. 
3. 

### Expected Behavior
What should happen.

### Actual Behavior
What actually happens.

### Error Message
```
Paste error message here
```

### Additional Context
Any other relevant information.
```

## 🚀 Feature Requests

### Before Requesting
1. Check if the feature already exists
2. Consider if it fits the project's scope
3. Think about implementation complexity

### When Requesting
Include the following:
- **Feature description**: Clear explanation
- **Use case**: Why is this needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Other ways to achieve this?

### Feature Request Template
```markdown
## Feature Request

### Description
Brief description of the feature.

### Use Case
Why is this feature needed?

### Proposed Solution
How should this feature work?

### Alternatives
What other solutions have you considered?

### Additional Context
Any other relevant information.
```

## 📝 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the coding standards
- [ ] Changes are tested thoroughly
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No merge conflicts

### PR Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
- [ ] Tested on macOS
- [ ] Tested on Linux
- [ ] Tested on Windows
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🏷️ Release Process

### Version Numbering
We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist
- [ ] Update version numbers
- [ ] Update CHANGELOG.md
- [ ] Test on multiple platforms
- [ ] Create release notes
- [ ] Tag the release

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check README.md and other docs first

## 🙏 Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- GitHub contributors list

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to n8n Local Setup! 🚀
